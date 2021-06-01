import { Link } from "react-router-dom"

const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
<<<<<<< HEAD
                <a
                  href='/events'
=======
                <Link
                  to='/events'
>>>>>>> e2aec2db7d6c7ab9f14fce9d94ac2ef171318336
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Todos los Eventos
                </Link>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header