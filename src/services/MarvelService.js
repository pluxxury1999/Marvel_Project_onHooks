import {useHttp} from '../hooks/http.hook';
const  useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=50b4bfb1baca5831950a81302bbdedf3';
    const _apiTS = 'ts=1'
    const _apiHash = 'hash=d7b8799fce6d4b5c7fdc5aa1fe57f524';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const characters = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}&${_apiTS}&${_apiHash}`);
        return characters.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const character = await request(`${_apiBase}characters/${id}?&${_apiKey}&${_apiTS}&${_apiHash}`);
        return _transformCharacter(character.data.results[0]);
    }

    const _transformCharacter = (character) => {
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

    const getAllComics = async (offset = _baseOffset) => {
        const comics = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}&${_apiTS}&${_apiHash}`);
        return comics.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
        const comic = await request(`${_apiBase}comics/${id}?&${_apiKey}&${_apiTS}&${_apiHash}`);
        return _transformComic(comic.data.results[0]);
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || `No info about "${comic.title}"`,
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'no info',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            language: comic.textObjects[0]?.language || "en-us",
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : "not avalible"
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic,  clearError}
}

export default useMarvelService;
