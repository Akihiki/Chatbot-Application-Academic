from threading import Timer

from flask import Flask, render_template, request, jsonify
from audio_recognition import get_audio, audio_to_text, play_sound
from chat import get_response

app = Flask(__name__)


@app.get("/")
def index_get():
    return render_template("base.html")


@app.post("/predict")
def predict():
    lang = request.get_json().get("lang")
    text = request.get_json().get("message")
    res = get_response(text)
    message = {"answer": res}
    setTimeSound(res, language=lang[0:2])
    return jsonify(message)


def setTimeSound(response1, language):
    r = Timer(0.001, play_sound, (response1,language))
    r.start()


@app.post("/audio")
def predictAudio():
    audio = get_audio()
    lang = request.get_json().get("lang")
    print(lang)
    text = audio_to_text(audio,lang)
    print(text)
    response = get_response(text)
    print(response)
    setTimeSound(response,language=lang[0:2])
    # play_sound(response,language=lang[0:2])
    return jsonify({"question": text, "answer": response})


if __name__ == "__main__":
    app.run(debug=True)
