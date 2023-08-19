import React from 'react'
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch.jsx';
import PersonBanner from './personBanner/PersonBanner.jsx';
import PersonImages from './personImages/PersonImages.jsx';
import PersonCredit from './personCredits/PersonCredit.jsx';

// import "./style.css";

const Person = () => {
    const {id} = useParams();
    const {data,loading} = useFetch(`/person/${id}`)
    const {data:images,loading:imagesLoading} = useFetch(`/person/${id}/images`)

    return (
        <div>
            <PersonBanner/>
            <PersonImages data={images?.profiles} loading={imagesLoading} />
            <PersonCredit data={data} loading={loading}/>
        </div>
    )
}

export default Person