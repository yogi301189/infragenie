import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_k8s_yaml(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Kubernetes YAML generator."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def generate_terraform_code(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Terraform code generator."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
