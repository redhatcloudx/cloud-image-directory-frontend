import * as React from 'react';
import { Card, PageSection, PageSectionVariants, Bullseye, Text, TextVariants, Title, TitleSizes, ClipboardCopy } from '@patternfly/react-core'
import ImageDataTable from '@app/components/ImageDataTable'
import azure_logo from '@app/bgimages/azure_clear.png'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import Footer from '@app/components/Footer'
import { Fzf } from 'fzf'


const Search: React.FunctionComponent<{ title: string }> = ({ title }) => {
    const [data, setData] = React.useState(new Fzf([]))
    const [results, setresults] = React.useState([])

    // https://imagedirectory.cloud/images/v1/idx/list/image-names
    useDocumentTitle(title)

    const loadData = () => {
        fetch(`https://imagedirectory.cloud/images/v1/idx/list/image-names`, {
            method: 'get',
        })
            .then(res => res.json())
            .then(data => {
                const fzf = new Fzf(data as string[])
                setData(fzf)
            })
    }

    React.useEffect(() => {
        loadData()
    })

    function handleChange(event) {
        /* TODO: https://www.geeksforgeeks.org/lodash-_-debounce-method/ */
        const entries = data.find(event.target.value)
        const res = entries.map(entry => entry.item)
        console.log(res)
        setresults(res)
        console.log(event.target.value);
    }

    return (
        <>
            <PageSection variant={PageSectionVariants.darker}>
                {/* TODO: https://hy.reactjs.org/docs/hooks-reference.html#usecallback */}
                <input type="text" onChange={handleChange} style={{
                    backgroundColor: 'black',
                }} />

                {/* TODO: key should be unique and limit the amount of shown items to e.g. 10 */}
                {results.map((p, idx) => <li key={idx}><a href={"https://imagedirectory.cloud/images/v1/" + p}>{p}</a></li>)}

            </PageSection>

            <Footer />
        </>
    )
}


export { Search }
