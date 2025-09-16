# Backend Infrastructure (Development)

This folder contains the initial development version of the Terraform infrastructure for the Text-to-Speech application.

## Purpose

This is the original backend infrastructure code used during development. The production-ready version is located in the `../end/` folder.

## Contents

This folder may contain:
- Initial Terraform configurations
- Development Lambda functions
- Experimental API Gateway setups
- Test S3 bucket configurations

## Status

⚠️ **Development Version**: This infrastructure is for reference only. Use the `../end/` folder for production deployment.

## Migration

The infrastructure has been migrated and improved in the `../end/` folder with:
- Better CORS configuration
- Optimized Lambda function
- Production-ready S3 and CloudFront setup
- Enhanced security policies

## Usage

For active development and deployment, please use:
```bash
cd ../end/
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

1. Review the production infrastructure in `../end/`
2. Use the final version for deployment
3. Refer to this folder for development history