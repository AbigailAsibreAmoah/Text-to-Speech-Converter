#########################################
# Backend essential outputs
#########################################

# Lambda function ARN
output "lambda_function_arn" {
  value       = aws_lambda_function.text_to_speech.arn
  description = "ARN of the Text-to-Speech Lambda function"
}

# Lambda IAM role ARN
output "lambda_role_arn" {
  value       = aws_iam_role.lambda_role.arn
  description = "IAM role ARN used by the Lambda function"
}

# Audio S3 bucket name
output "audio_bucket_name" {
  value       = aws_s3_bucket.audio_bucket.bucket
  description = "S3 bucket where audio files are stored"
}

# API Gateway endpoint (if API Gateway is deployed)
output "api_endpoint" {
  value       = aws_api_gateway_rest_api.tts_api.execution_arn
  description = "Invoke URL for the Text-to-Speech API"
}
