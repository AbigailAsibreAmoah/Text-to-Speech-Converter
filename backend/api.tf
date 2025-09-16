# Create REST API
resource "aws_api_gateway_rest_api" "tts_api" {
  name        = "TextToSpeechAPI"
  description = "API for Lambda Text-to-Speech function"
}

# Create /speak resource
resource "aws_api_gateway_resource" "tts_resource" {
  rest_api_id = aws_api_gateway_rest_api.tts_api.id
  parent_id   = aws_api_gateway_rest_api.tts_api.root_resource_id
  path_part   = "speak"
}

# POST method
resource "aws_api_gateway_method" "tts_method" {
  rest_api_id   = aws_api_gateway_rest_api.tts_api.id
  resource_id   = aws_api_gateway_resource.tts_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

# Integration with Lambda
resource "aws_api_gateway_integration" "tts_integration" {
  rest_api_id             = aws_api_gateway_rest_api.tts_api.id
  resource_id             = aws_api_gateway_resource.tts_resource.id
  http_method             = aws_api_gateway_method.tts_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.text_to_speech.invoke_arn
}

# OPTIONS method for CORS
resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.tts_api.id
  resource_id   = aws_api_gateway_resource.tts_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id = aws_api_gateway_rest_api.tts_api.id
  resource_id = aws_api_gateway_resource.tts_resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  type        = "MOCK"
  
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "options_response" {
  rest_api_id = aws_api_gateway_rest_api.tts_api.id
  resource_id = aws_api_gateway_resource.tts_resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  depends_on = [aws_api_gateway_integration.options_integration]
  
  rest_api_id = aws_api_gateway_rest_api.tts_api.id
  resource_id = aws_api_gateway_resource.tts_resource.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Deploy the API
resource "aws_api_gateway_deployment" "tts_deployment" {
  depends_on = [
    aws_api_gateway_method.tts_method,
    aws_api_gateway_integration.tts_integration,
    aws_api_gateway_method.options_method,
    aws_api_gateway_integration.options_integration,
    aws_api_gateway_integration_response.options_integration_response
  ]

  rest_api_id = aws_api_gateway_rest_api.tts_api.id
  
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.tts_resource.id,
      aws_api_gateway_method.tts_method.id,
      aws_api_gateway_integration.tts_integration.id,
      aws_api_gateway_method.options_method.id,
      aws_api_gateway_integration.options_integration.id,
      aws_api_gateway_integration_response.options_integration_response.id,
    ]))
  }
  
  lifecycle {
    create_before_destroy = true
  }
}

# Create API Gateway stage
resource "aws_api_gateway_stage" "tts_stage" {
  deployment_id = aws_api_gateway_deployment.tts_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.tts_api.id
  stage_name    = "prod"
}

# Lambda permission for API Gateway
resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.text_to_speech.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.tts_api.execution_arn}/*/*"
}
