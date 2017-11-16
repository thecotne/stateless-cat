import { Link } from 'react-router-dom'
import React from 'react'

export default () =>
  <div>
    <nav className='navbar navbar-expand-md navbar-dark bg-dark fixed-top'>
      <div className='container'>
        <a className='navbar-brand' href='javascript:'>Stateless Cat</a>
      </div>
    </nav>

    <main role='main' className='container'>
      <p>InnerPage Hello World!</p>
      <Link to='/'>go to IndexPage</Link>
    </main>
  </div>
