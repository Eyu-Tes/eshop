import PropTypes from 'prop-types'

const Rating = ({ value, text, color="#f8e825" }) => {
    return (
        <div className="rating">
            <span>
                <i style={{color}}
                    className={
                        value >= 1 
                        ? 'fa fa-star' 
                        : (value >=0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o')
                    }
                ></i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 2 
                        ? 'fa fa-star' 
                        : (value >=1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o')
                    }
                ></i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 3 
                        ? 'fa fa-star' 
                        : (value >=2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o')
                    }
                ></i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 4 
                        ? 'fa fa-star' 
                        : (value >=3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o')
                    }
                ></i>
            </span>
            <span>
                <i style={{color}}
                    className={
                        value >= 5
                        ? 'fa fa-star' 
                        : (value >=4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o')
                    }
                ></i>
            </span>
            <span>{text}</span>
        </div>
    )
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string, 
    color: PropTypes.string
}

export default Rating
