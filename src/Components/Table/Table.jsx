import React from 'react'
import "./Table.scss"

function Table({ headers, data }) {
    return (

        <table className="table">
            <thead>
                <tr>
                    {headers && headers.map((data, key) => {
                        return <th scope="col" key={key}><p>{data}</p></th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data && data.map((dat, key) => {
                    return <tr key={key}>
                        {dat && dat.map((d, k) => {
                            return <td><p>{d}</p></td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>

    )
}

export default Table