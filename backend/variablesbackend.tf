variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "audio_s3_bucket_name" {
  description = "S3 bucket for storing generated audio files"
  type        = string
  default     = "text-to-speech-audio-bucket-12345"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
  default     = "TextToSpeechFunction"
}

variable "lambda_handler" {
  description = "Lambda function handler"
  type        = string
  default     = "lambda_txt2speech.lambda_handler"
}

variable "lambda_runtime" {
  description = "Lambda runtime environment"
  type        = string
  default     = "python3.11"
}


variable "api_name" {
  description = "Name of the API Gateway"
  type        = string
  default     = "TextToSpeechAPI"
}

variable "api_stage_name" {
  description = "Stage name for API Gateway"
  type        = string
  default     = "dev"
}

