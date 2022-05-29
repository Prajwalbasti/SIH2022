import React from 'react'
import "./Table.scss"

function Table({  data }) {
    
    const headers = data[0].split(",")

    return (

        <table className="table">
            <thead>
                <tr>
                    {headers ? headers.map((data, key) => {
                        return <th scope="col" key={key}><p>{data}</p></th>
                    }) : null}
                </tr>
            </thead>
            <tbody>
                {data ? data.map((dat, key) => {
                    
                    if(key!=0){
                        const datum = dat.split(",")
                    return <tr key={key}>
                        {datum && datum.map((d, k) => {
                            return <td><p>{d}</p></td>
                        })}
                    </tr>
                    }
                    
                }) : null}
            </tbody>
        </table>

    )
}

export default Table