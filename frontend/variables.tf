variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Unique name for the S3 frontend bucket"
  default     = "my-text-to-speech-frontend"
}
