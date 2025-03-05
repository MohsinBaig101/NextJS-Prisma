import Image from 'next/image'
import Button from './Button';

export default function SubscriptionCard(){
    return (
        <div className="flex flex-nowrap card sm-12">
            <div className="sm-4">
                <Image
                    width={150}
                    height={150}
                    src={"/product-1.jpeg"}
                    alt='Iphone Product Image'
                />
            </div>
            <div className="sm-8 flex">
                <div className='flex flex-col justify-end mb-4'>
                    <h4>Apple Iphone 14 pro max - 128GB Dual SIM</h4>
                    <div className='flex flex-nowrap'>
                        <h6>Active</h6>
                        <p>until 02.10.2023</p>
                    </div>
                    <h6>$114.90 per month</h6>
                    <Button>
                        <span>Extend rental to 6 months for $89.00 per month</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}