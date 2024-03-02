class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=50b4bfb1baca5831950a81302bbdedf3';
    _apiTS = 'ts=1'
    _apiHash = 'hash=d7b8799fce6d4b5c7fdc5aa1fe57f524';
    _baseOffset = 210;

    getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const characters = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}&${this._apiTS}&${this._apiHash}`);
        return characters.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}&${this._apiTS}&${this._apiHash}`);
        return this._transformCharacter(character.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 210)}...` : `No info about ${character.name}`,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }
}

export default MarvelService;
