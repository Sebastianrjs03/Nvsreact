import '../../styles/Tienda/BodyCard.css';

type BodyCardProps = {
    children: React.ReactNode
}


function BodyCard({children}: BodyCardProps) {

    return(
    <section className="BodyCard">
        {children}
    </section>
    );
}

export default BodyCard;