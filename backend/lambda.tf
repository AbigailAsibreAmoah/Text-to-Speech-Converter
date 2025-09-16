resource "aws_iam_role" "lambda_role" {
  name = "text_to_speech_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# S3 full access
resource "aws_iam_role_policy_attachment" "lambda_s3" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

# Polly full access
resource "aws_iam_role_policy_attachment" "lambda_polly" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonPollyFullAccess"
}

# Translate full access
resource "aws_iam_role_policy_attachment" "lambda_translate" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/TranslateFullAccess"
}

#########################################
# Lambda Function
#########################################
resource "aws_lambda_function" "text_to_speech" {
  function_name = var.lambda_function_name
  handler       = var.lambda_handler
  runtime       = var.lambda_runtime
  role          = aws_iam_role.lambda_role.arn

  filename         = "${path.module}/lambda_txt2speech.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda_txt2speech.zip")

  environment {
    variables = {
      AUDIO_BUCKET = aws_s3_bucket.audio_bucket.bucket
    }
  }
}

