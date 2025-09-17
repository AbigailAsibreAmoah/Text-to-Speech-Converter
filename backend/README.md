# Backend Infrastructure (Production)

This folder contains the production-ready Terraform infrastructure for the Text-to-Speech application.

## Architecture Components

- **API Gateway**: RESTful API with CORS support
- **Lambda Function**: Text processing, translation, and speech synthesis with SSML
- **IAM Roles**: Security and permissions for AWS services
- **Cost-Optimized**: ~$0.11/month for moderate usage

## Files

- `mainbackend.tf` - Main provider configuration
- `api.tf` - API Gateway configuration with CORS
- `lambda.tf` - Lambda function and IAM roles
- `variablesbackend.tf` - Input variables
- `outputsbackend.tf` - Output values
- `lambda_txt2speech.py` - Lambda function code with SSML support
- `lambda_txt2speech.zip` - Lambda deployment package
- `requirements.txt` - Python dependencies

## Deployment

### Prerequisites

- AWS CLI configured
- Terraform installed
- Appropriate AWS permissions

### Steps

1. **Initialize Terraform**:
   ```bash
   terraform init
   ```

2. **Review Plan**:
   ```bash
   terraform plan
   ```

3. **Deploy Infrastructure**:
   ```bash
   terraform apply
   ```

4. **Get Outputs**:
   ```bash
   terraform output
   ```

## Configuration

### Variables

- `aws_region` - AWS region (default: us-east-1)
- `s3_bucket_name` - Frontend S3 bucket name
- `audio_s3_bucket_name` - Audio storage bucket name
- `lambda_function_name` - Lambda function name
- `lambda_handler` - Lambda handler function
- `lambda_runtime` - Python runtime version

### Outputs

- `api_endpoint` - API Gateway endpoint ARN
- `audio_bucket_name` - Audio S3 bucket name
- `lambda_function_arn` - Lambda function ARN
- `lambda_role_arn` - Lambda execution role ARN

## Lambda Function

The Lambda function handles:
- Text translation using AWS Translate
- Speech synthesis using AWS Polly
- Voice selection based on language
- Base64 audio encoding for web delivery

### Supported Languages & Voices

- **🇺🇸 English (US)**: Joanna (Female), Matthew (Male)
- **🇬🇧 English (UK)**: Amy (Female), Brian (Male)
- **🇫🇷 French**: Celine (Female)
- **🇩🇪 German**: Marlene (Female)
- **🇰🇷 Korean**: Seoyeon (Female)

## API Endpoints

### POST /prod/speak

Convert text to speech with optional translation.

**Request Body**:
```json
{
  "text": "Hello world",
  "voice": "Joanna",
  "language": "fr-FR",
  "speed": "1.0"
}
```

**Response**:
```json
{
  "audio": "base64-encoded-mp3-data",
  "translatedText": "Bonjour le monde",
  "originalText": "Hello world",
  "ssmlUsed": "<speak>Bonjour le monde</speak>",
  "voiceSettings": {
    "speed": "1.0"
  }
}
```

## Security

- Lambda execution role with minimal required permissions
- CORS enabled for cross-origin requests
- S3 bucket policies for secure access
- CloudFront OAI for S3 access control

## Monitoring

- CloudWatch logs for Lambda function
- API Gateway access logs
- CloudFront access logs

## Cleanup

To destroy all resources:
```bash
terraform destroy
```