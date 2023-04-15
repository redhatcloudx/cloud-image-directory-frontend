import * as React from 'react';
import { ApplicationLauncher, ApplicationLauncherItem } from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import  fuzzysort from 'fuzzysort'
import { SearchIcon } from '@patternfly/react-icons'
import { Link } from 'react-router-dom'


const Search: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const [data, setData] = React.useState([])
    const [results, setResults] = React.useState<Fuzzysort.Results>(Object.assign([], { total: 0 }))
    const [outputFocus, setOutputFocus] = React.useState(false)
    const [inputFocus, setInputFocus] = React.useState(false)

    useDocumentTitle(title)

    const loadData = () => {
        fetch(`https://imagedirectory.cloud/images/v1/idx/list/image-names`, {
          method: 'get',
        })
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }

    React.useEffect(() => {
        loadData()
    }, [])

    function handleChange(event) {
        const res = fuzzysort.go(
          event.target.value,
          data,
          {
            threshold: -300,
            limit: 10,
          }
        )
        setResults(res)
    }

    const list = results.map((p, idx) => (
      <ApplicationLauncherItem
        onMouseEnter={() => {setOutputFocus(true)}}
        onMouseLeave={() => setOutputFocus(false)}
        key={`search-result-list-${idx}`}
        >
          <Link
            style={{
              color: 'black'
            }}
            to={`/browser/${p['target']}`}>
            {
              fuzzysort.highlight(p, (m, i) => (
                <span style={{
                  fontWeight: 'bold',
                  color: 'red'
                }}
                key={`search-result-${i}`}>{m}</span>))
            }
          </Link>
        </ApplicationLauncherItem>
    ))

    return (
        <>
          {/* TODO: https://hy.reactjs.org/docs/hooks-reference.html#usecallback */}
          <ApplicationLauncher
            isOpen={list.length > 0 && (inputFocus || outputFocus)}
            items={list}
            toggleIcon={<SearchIcon />}
          />
          <input
            type="text"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onSelect={handleChange}
            onChange={handleChange}
            style={{
              backgroundColor: 'black',
          }} />
        </>
    )
}


export { Search }
