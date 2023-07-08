from flask import Flask, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    if not url:
        return {'error': 'URL not provided'}, 400

    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        image = soup.find('meta', property='og:image')['content']

        return {'image': image}
    except (requests.RequestException, KeyError) as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run()
