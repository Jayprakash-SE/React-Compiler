from flask import Flask, redirect, render_template, request, jsonify
import os
import requests
import json
import config

# Config App
app = Flask(
    __name__,
    template_folder='../build',
    static_folder='../build/static'
)

app.config["SECRET_KEY"] = os.urandom(34)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/usages')
def usage():
    data = {
        "clientId": config.clientId,
        "clientSecret": config.clientSecret
    }

    headers = {
        'content-type': "application/json"
    }

    r = requests.post("https://api.jdoodle.com/v1/credit-spent",
                      json=data, headers=headers)
    r = r.json()

    return r


@app.route('/execute', methods=["POST"])
def execute():
    if request.method == "POST":
        data = request.get_data(as_text=True)
        data = json.loads(data)

        payload = {
            "clientId": config.clientId,
            "clientSecret": config.clientSecret,
            "script": data.get("text", ""),
            "stdin": data.get("inputValues", ""),
            "language": data.get("lang", ""),
            "versionIndex": 0
        }

        headers = {
            'content-type': "application/json"
        }

        r = requests.post("https://api.jdoodle.com/v1/execute",
                          json=payload, headers=headers)
        r = r.json()

        return r

    else:
        return jsonify({"status": "error", "msg": "Invalid method"})


if __name__ == "__main__":
    app.run()
