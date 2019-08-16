import { trim } from 'lodash'
import React, { useEffect, useState } from 'react'
import { GitCommit, Trash2, User } from 'react-feather'

import { ipfs } from '../../common/ipfs'
import { Spinner } from '../Spinner'

import css from './bootstrap.css'

const NodesTable = ({ nodes, remove }) => {
  const rows = nodes.map((node, index) => (
    <tr key={index}>
      <td width="90%">{node}</td>
      <td width="10%">
        <Trash2
          className={css.trash}
          size={16}
          onClick={() => remove(node)}
        />
      </td>
    </tr>
  ))

  return (
    <div className={css.list}>
      <table className={css.head}>
        <thead>
          <tr>
            <td width="90%">Boostrap nodes address</td>
            <td width="10%"></td>
          </tr>
        </thead>
      </table>
      <hr className={css.hr} />
      <div className={css.body}>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  )
}

export const Bootstrap = () => {
  const [loading, setLoading] = useState(true)

  const [node, setNode] = useState('')

  const [nodes, setNodes] = useState([])

  const add = async (node) => {
    if (ipfs) {
      ipfs.bootstrap
        .add(node)
        .then(ipfs.bootstrap.list)
        .then(({ Peers }) => setNodes(Peers))
        .catch(err => console.log(err))
    }
  }

  const fetch = async () => {
    if (ipfs) {
      ipfs.bootstrap
        .list()
        .then(({ Peers }) => setNodes(Peers))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
  }

  const remove = async (node) => {
    if (ipfs) {
      ipfs.bootstrap
        .rm(node)
        .then(ipfs.bootstrap.list)
        .then(({ Peers }) => setNodes(Peers))
        .catch(err => console.log(err))
    }
  }

  const submit = event => {
    event.preventDefault()
    setNode('')
    add(trim(node))
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className={css.section}>
      <div className={css.info}>
        <div className={css.bar}>
          <form className={css.form} onSubmit={submit}>
            <input
              type="text"
              className={css.node}
              placeholder="Add a new bootstrap node"
              value={node}
              onChange={event => setNode(event.target.value || '')}
            />
          </form>
        </div>
        <div className={css.nodes}>
          <GitCommit className={css.nodesIcon} size={16} />
          Bootstrap nodes:
          <span className={css.nodesText}>{nodes.length}</span>
        </div>
      </div>

      {loading && (
        <Spinner
          containerClass={css.spinner}
          size={30}
          text="Bootstrap nodes loading ..."
        />
      )}
      {!loading && <NodesTable nodes={nodes} remove={remove} />}
    </section>
  )
}
