import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyDiscount, removeDiscount } from './actions';
import './DiscountForm.css';

const DiscountForm = () => {
    const [code, setCode] = useState('');
    const [invalidCode, setInvalidCode] = useState(false);
    const discountApplied = useSelector(state => state.cart.discount.percentage);
    const [discountDisplayed, setDiscountDisplayed] = useState(discountApplied * 100);
    const dispatch = useDispatch();

    const handleChange = (evt) => setCode(evt.target.value);

    const handleSubmit = () => {
        const action = applyDiscount(code);
        if (action) {
            dispatch(action);
            setInvalidCode(false);
            setDiscountDisplayed(action.payload.discountPercent * 100);
        } else setInvalidCode(true);
    }

    const handleRemove = () => {
        dispatch(removeDiscount());
        setDiscountDisplayed(0);
    }

    return (
        <div className="DiscountForm">
            {invalidCode ? <div className="DiscountForm-invalid">Invalid code! Please enter a valid code to get a discount.</div> : null}
            {discountDisplayed ? (
                <div className="DiscountForm-discount-display">
                    {discountDisplayed.toFixed(0)}% discount applied!
                </div>
            ) : (
                    <div className="DiscountForm-input-container">
                        <label htmlFor="code">Discount code:</label>
                        <input className="DiscountForm-input" type="text" name="code" value={code} onChange={handleChange} />
                    </div>
                )}
            {discountDisplayed ? (
                <button className="DiscountForm-button DiscountForm-button-remove" onClick={handleRemove}>Use a different code</button>
            ) : (
                    <button className="DiscountForm-button" onClick={handleSubmit}>Apply</button>
                )}
        </div>
    )
}

export default DiscountForm;