import React from 'react'

const HistorialInventario = () => {
  return (
    <>
    <div className="bg-gray-200 shadow-md rounded px-4 pt-6 pb-6 mb-4 flex flex-col my-2">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2 text-stone-600">Historial de inventario</h2>
          <div className="flex flex-auto p-4 gap-2 justify-between text-center">
            <table className='table-fixed'>
            <thead>
             <tr>
             <th>Song</th>
             <th>Artist</th>
            </tr>
           </thead>
           <tbody>
          <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>          
          </tr>
       <tr>
      <td>Witchy Woman</td>
    </tr>
    <tr>
      <td>Shining Star</td>


    </tr>
  </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistorialInventario


