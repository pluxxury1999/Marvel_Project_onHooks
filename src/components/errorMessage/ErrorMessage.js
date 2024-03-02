import img from './error.gif'

const ErrorMessage = () => {
    return (
        <img style={{display: 'block', width: '150px', height: '150px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='error img'/>
    )
}

export default ErrorMessage;