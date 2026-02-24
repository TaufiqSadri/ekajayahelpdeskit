function Card({ title, children, className = '', headerAction }) {
    return (
      <div className={`card ${className}`}>
        {title && (
          <div className="card-header flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        <div className={title ? '' : ''}>{children}</div>
      </div>
    )
  }
  
  export default Card
  