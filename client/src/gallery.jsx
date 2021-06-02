import { Link } from "react-router-dom"

const Gallery = (props) => {
  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Eventos Pasados</h2>
          <p>
            Algunos de los momentos favoritos
          </p>
        </div>
        <div className='row'>
          <div className='portfolio-items'>
            {
              props.data ?
                props.data.map((event, i) => (
                  <div className='col-sm-6 col-md-4 col-lg-4'>
                    <div className='portfolio-item'>
                      <div className='hover-bg'>
                        {' '}
                        <Link
                          to={`/event?eventId=${event._id}`}
                          title={event.title}
                          data-lightbox-gallery='gallery1'
                        >
                          <div className='hover-text'>
                            <h4>{event.title}</h4>
                          </div>
                          <img
                            src={event.imgKeys && event.imgKeys.length > 0 ? event.imgKeys[0] : 'img/portfolio/01-small.jpg'}
                            className='img-responsive'
                            alt={event.title}
                          />{' '}
                        </Link>{' '}
                      </div>
                    </div>
                  </div>
                  ))
              : 'Loading...'
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Gallery