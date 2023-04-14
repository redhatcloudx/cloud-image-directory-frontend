import * as React from 'react';
import { ApplicationLauncher, ApplicationLauncherItem } from '@patternfly/react-core'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import  fuzzysort from 'fuzzysort'
import { SearchIcon } from '@patternfly/react-icons'


const Search: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const [data, setData] = React.useState([])
    const [results, setresults] = React.useState([])
    const [outputFocus, setOutputFocus] = React.useState(false)
    const searchInput = React.useRef(null)

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
    })

    function handleChange(event) {
        /* TODO: https://www.geeksforgeeks.org/lodash-_-debounce-method/ */
        const res = fuzzysort.go(
          event.target.value,
          data,
          {
            threshold: -300,
            limit: 10,
          }
        )
        setresults(res)
    }

    let list = results.map((p, idx) => (
      <ApplicationLauncherItem onFocus={() => setOutputFocus(true)} key={`search-result-list-${idx}`}
         href={"https://imagedirectory.cloud/images/v1/" + p['target']} style={{
          fontWeight: 'bold',
          color: 'black'
        }}>
          {
            fuzzysort.highlight(p, (m, i) => (
              <span style={{
                fontWeight: 'bold',
                color: 'red'
              }}
              key={`search-result-${i}`}>{m}</span>))
          }
        </ApplicationLauncherItem>
    ))


    return (
        <>
          {/* TODO: https://hy.reactjs.org/docs/hooks-reference.html#usecallback */}
          <ApplicationLauncher
            isOpen={
              list.length > 0 &&
              (document.activeElement === searchInput.current || outputFocus)
            }
            items={list}
            toggleIcon={<SearchIcon />}
          />
          <input ref={searchInput} type="text" onSelect={handleChange} onChange={handleChange} style={{
              backgroundColor: 'black',
          }} />
        </>
    )
}


export { Search }
