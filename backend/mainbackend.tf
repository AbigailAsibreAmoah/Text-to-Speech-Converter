provider "aws" {
  region = var.aws_region
}

# S3 bucket for storing generated audio files
resource "aws_s3_bucket" "audio_bucket" {
  bucket = var.audio_s3_bucket_name

  tags = {
    Name        = "TextToSpeechAudio"
    Environment = "Dev"
  }
}

# Disable ACLs, AWS best practice
resource "aws_s3_bucket_ownership_controls" "audio_bucket_ownership" {
  bucket = aws_s3_bucket.audio_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

