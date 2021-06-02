import { Link } from "react-router-dom"

const SpecialEvents = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>Próximos Eventos</h2>
        </div>
        <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
                <Link to={`/event?eventId=${d._id}`}>
                  <div key={`${d._id}`} className='col-xs-6 col-md-3'>
                    {' '}
                    <i className={d.imgKeys && d.imgKeys.length > 0 ? d.imgKeys[0] :''}></i>
                    <h3>{d.title}</h3>
                    <p>{d.description.length > 80 ? d.description.substr(0, 80) + '...': d.description}</p>
                  </div>
                </Link>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  )
}
export default SpecialEvents
