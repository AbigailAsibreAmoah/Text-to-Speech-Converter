# Frontend Infrastructure (Development)

This folder contains the initial development version of the Terraform infrastructure for hosting the React frontend.

## Purpose

This is the original frontend infrastructure code used during development. The production deployment now uses the backend infrastructure in the `../backend/` folder.

## Contents

This folder may contain:
- Initial Terraform configurations
- Development Lambda functions
- Experimental API Gateway setups
- Test S3 bucket configurations

## Status

⚠️ **Development Version**: This infrastructure is for reference only. Use the `../backend/` folder for production deployment.

## Migration

The infrastructure has been consolidated in the `../backend/` folder with:
- Combined backend and frontend infrastructure
- Better CORS configuration
- Optimized Lambda function with SSML support
- Production-ready S3 and CloudFront setup
- Enhanced security policies

## Usage

For active development and deployment, please use:
```bash
cd ../backend/
terraform init
terraform apply
```

## Files

The specific files in this folder represent the development iteration of the infrastructure and may include:
- Early Terraform configurations
- Initial Lambda function versions
- Basic API Gateway setups
- Development S3 bucket policies

## Learning Reference

This folder serves as a reference for:
- Infrastructure evolution
- Development process
- Configuration improvements
- Lessons learned during development

## Next Steps

1. Review the production infrastructure in `../backend/`
2. Use the consolidated version for deployment
3. Refer to this folder for development history