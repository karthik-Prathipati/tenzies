export default function Time(props) {
    return (
        <p className="counter">
            {`
          ${props.hours < 10 ? '0' + props.hours : props.hours} :
          ${props.minutes < 10 ? '0' +props.minutes : props.minutes} :
          ${props.seconds < 10 ? '0' + props.seconds : props.seconds}
        `}
        </p>
    );
}