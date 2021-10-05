import React, { useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiUrl } from '../../urls';

// search bar to display all Businesses
export const SearchBar = () => {
    const [inputValue, setInputValue] = useState([]);
    const [value, setValue] = useState("");
    const [filteredInput, setFilteredInput] = useState([])

    useEffect(() => {
        const filteredValue = inputValue.filter((item) => {
            return item.busName.toLowerCase().includes(value.toLowerCase());

        })
        setFilteredInput(filteredValue)
    }, [value])

    useEffect(() => {
        const getBusNames = async () => {

            const response = await fetch(`${apiUrl}/search/results`)
            const data = await response.json();

            setInputValue(data.data.map((item) => {
                return { busName: item.busName }
            }))
        }
        getBusNames();
    }, [])
    return (
        <Container>
            <CgSearch />
            <SearchInput
                type="text"
                placeholder="Search here"
                onChange={(event) => setValue(event.target.value)}
            />
            {filteredInput.length && <SearchContainer>
                {value.length > 1 && (
                    <>
                        <UnorderedList>
                            {filteredInput.map((item, index) => {
                                return (
                                    <DetailLink key={index} to="#">
                                        <SuggestionList>
                                            {item.busName.slice(0, value.length)}
                                            <Result>
                                                {item.busName.slice(
                                                    value.length
                                                )}
                                            </Result>
                                            {" "}
                                        </SuggestionList>
                                    </DetailLink>
                                )
                            })}
                        </UnorderedList>
                    </>)}
            </SearchContainer>}
        </Container>
    )
};

const Container = styled.div`
display: flex;
justify-content: center;
`

const SearchContainer = styled.div`
position: relative;
`

const SearchInput = styled.input`
width: 500px;
height: 40px;
border-radius: 3px;
padding-left: 10px;
border: 1px solid #c2c2c2;
outline-color: #a6a6a6;
box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
position: absolute;
margin: 0 auto;
display: flex;
justify-content: center;
`;

const SuggestionList = styled.li`
border: 5px solid white;
list-style-type: none;
padding: 10px 0;
margin-right: 100px;
width: 100%;
text-overflow: ellipsis;

&:hover {
background-color: #fff8dc;
}
`;

const UnorderedList = styled.ul`
position: absolute;
left: 0px;
width: 298px;
float: right;
background-color: white;
border: 2px solid black;
border-bottom: 1px solid black;
max-height: 300px;
text-align: left;
border-radius: 4px;
overflow-y: scroll;
z-index: 1;
`;

const Result = styled.span`
font-weight: bold;
`;

const DetailLink = styled(Link)`
text-decoration: none;
color: black;
`;
