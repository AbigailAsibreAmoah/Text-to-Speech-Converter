import boto3
import json
import base64

# AWS clients
polly = boto3.client("polly")
translate = boto3.client("translate")

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
        
        # Synthesize speech
        response = polly.synthesize_speech(
            Text=translated_text,
            OutputFormat="mp3",
            VoiceId=polly_voice
        )
        
        # Read audio data
        audio_data = response["AudioStream"].read()
        
        # Return both audio and translation
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "audio": base64.b64encode(audio_data).decode('utf-8'),
                "translatedText": translated_text,
                "originalText": text
            })
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)})
        }