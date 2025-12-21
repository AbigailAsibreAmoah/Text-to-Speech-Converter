import boto3
import json
import base64

# AWS clients
polly = boto3.client("polly")
translate = boto3.client("translate")


def build_ssml_text(text, speed):
    """Build SSML formatted text with prosody"""

    # Escape any existing SSML tags in user input
    text = text.replace('<', '&lt;').replace('>', '&gt;')

    # Wrap with prosody tags
    if speed != "1.0":
        text = f'<prosody rate="{speed}">{text}</prosody>'

    # Wrap in SSML speak tag
    ssml_text = f'<speak>{text}</speak>'

    return ssml_text


def lambda_handler(event, context):
    # CORS headers
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    try:
        # Parse request body
        if event.get('body'):
            body = json.loads(event['body'])
        else:
            body = event

        text = body.get("text", "Hello World")
        voice = body.get("voice", "Joanna")
        language = body.get("language", "en-US")

        # SSML parameters
        speed = body.get("speed", "1.0")  # 0.25, 0.5, 1.0, 1.5, 2.0

        # Map language codes for translation
        lang_map = {
            "en-US": "en",
            "fr-FR": "fr",
            "de-DE": "de",
            "ko-KR": "ko"
        }

        target_lang = lang_map.get(language, "en")
        translated_text = text

        # Translate if not English
        if target_lang != "en":
            translate_response = translate.translate_text(
                Text=text,
                SourceLanguageCode="en",
                TargetLanguageCode=target_lang
            )
            translated_text = translate_response["TranslatedText"]

        # Map voices for different languages
        voice_map = {
            "fr-FR": "Celine",
            "de-DE": "Marlene",
            "ko-KR": "Seoyeon",
            "en-US": voice
        }

        polly_voice = voice_map.get(language, voice)

        # Build SSML text
        ssml_text = build_ssml_text(translated_text, speed)

        # Synthesize speech with SSML
        response = polly.synthesize_speech(
            Text=ssml_text,
            TextType="ssml",
            OutputFormat="mp3",
            VoiceId=polly_voice
        )

        # Read audio data
        audio_data = response["AudioStream"].read()

        # Return audio, translation, and SSML info
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "audio": base64.b64encode(audio_data).decode('utf-8'),
                "translatedText": translated_text,
                "originalText": text,
                "ssmlUsed": ssml_text,
                "voiceSettings": {
                    "speed": speed
                }
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)})
        }
