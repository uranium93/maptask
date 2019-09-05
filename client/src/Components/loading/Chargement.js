import React from 'react'
import styles from './Chargement.module.css'
const Chargement = () => {
    return (
        <div>
            <div className={styles.loading}>
                <div className={styles.bounceball}></div>
                <div className={styles.text}>Chargement...</div>
            </div>
        </div>
    );
}

export default Chargement;