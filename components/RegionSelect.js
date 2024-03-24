import React, { useEffect, useState } from "react";
import styles from "./../styles/RegionSelect.module.css";

const RegionSelect = (props) => {
    const [option, setOption] = useState(null); // Initialize option as null
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user's current position when component mounts
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Extract region based on user's position
                const userRegion = getUserRegion(position.coords.latitude, position.coords.longitude);
                setOption(userRegion);
            },
            (error) => {
                setError(error.message); // Handle error if geolocation fails
            }
        );
    }, []);

    // Function to determine user's region based on coordinates
    const getUserRegion = (latitude, longitude) => {
        // Logic to determine the region based on coordinates
        // For simplicity, let's assume a basic logic here
        // You may replace this with more accurate logic based on your requirements

        // Example: If within Malaysia's coordinates, return 1 (Malaysia)
        if (latitude >= 1.2 && latitude <= 6.5 && longitude >= 99.6 && longitude <= 104.4) {
            return 1;
        } 
        // Example: If within Singapore's coordinates, return 2 (Singapore)
        else if (latitude >= 1.2 && latitude <= 1.5 && longitude >= 103.5 && longitude <= 104.1) {
            return 2;
        } 
        // Default: Return 3 (Other regions)
        else {
            return 3;
        }
    };

    const handleContinue = () => {
        props.handleRegion(option);
    };

    if (error) {
        return <div>Error: {error}</div>; // Handle geolocation error
    }

    return (
        <div className={styles.regionselect}>
            <div className={styles.title}>Select your region</div>
            <div className={styles.subtitle}>We’ll give you recycling advice tailored to your location.</div>
            <div className={styles.options}>
                <div className={option === 1 ? styles.optioncheck : styles.option} onClick={() => setOption(1)}>
                    <div className={styles.info}>
                        <img src={option === 1 ? "checked.svg" : "unchecked.svg"} alt="checked"/>
                        <div className={styles.name}>🇲🇾 Malaysia</div>
                        <div className={styles.desc}>Specific plastic recycling advice for Malaysia</div>
                    </div>
                </div>
                <div className={option === 2 ? styles.optioncheck : styles.option} onClick={() => setOption(2)}>
                    <div className={styles.info}>
                        <img src={option === 2 ? "checked.svg" : "unchecked.svg"} alt="checked"/>
                        <div className={styles.name}>🇸🇬 Singapore</div>
                        <div className={styles.desc}>Specific plastic recycling advice for Singapore</div>
                    </div>
                </div>
                <div className={option === 3 ? styles.optioncheck : styles.option} onClick={() => setOption(3)}>
                    <div className={styles.info}>
                        <img src={option === 3 ? "checked.svg" : "unchecked.svg"} alt="checked"/>
                        <div className={styles.name}>Other</div>
                        <div className={styles.desc}>General advice for other regions</div>
                    </div>
                </div>
            </div>
            <div className={option === null ? styles.disabled : styles.button} onClick={handleContinue}>Continue</div>
        </div>
    );
};

export default RegionSelect;


/*import React, { useEffect, useState } from "react";
import styles from "./../styles/RegionSelect.module.css";

const RegionSelect = (props) => {
	const [option, setOption] = useState(props.region);

	const handleContinue = () => {
		props.handleRegion(option);
	}

	return (
		<div className={styles.regionselect}>
			<div className={styles.title}>Select your region</div>
			<div className={styles.subtitle}>We’ll give you recycling advice tailored to your location. We currently only support the UK.</div>
			<div className={styles.options}>
				<div className={option === 1 ? styles.optioncheck : styles.option} onClick={() => setOption(1)}>
					<div className={styles.info}>
					<img src={option === 1 ? "checked.svg" : "unchecked.svg"}/>
						<div className={styles.name}>💂‍♂ London</div>
						<div className={styles.desc}>Specific plastic recycling advice</div>
					</div>
				</div>
				<div className={option === 2 ? styles.optioncheck : styles.option} onClick={() => setOption(2)}>
				<div className={styles.info}>
						<img src={option === 2 ? "checked.svg" : "unchecked.svg"}/>
						<div className={styles.name}>🇬🇧 United Kingdom</div>
						<div className={styles.desc}>General advice</div>
					</div>
				</div>
			</div>
			<div className={option === 0 ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
		</div>
	)
}

export default RegionSelect;
*/
