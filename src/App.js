import {
  ReactiveBase,
  SearchBox,
  ReactiveList,
  ResultCard,
  MultiDataList,
  DataSearch
} from "@appbaseio/reactivesearch";

function App() {
  return (
    <div className="App">
      <ReactiveBase
        app="movies-demo-app"
        url="https://81719ecd9552:e06db001-a6d8-4cc2-bc43-9c15b1c0c987@appbase-demo-ansible-abxiydt-arc.searchbase.io"
        enableAppbase
        // theme={{
        //   typography: {
        //     fontFamily:
        //       '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
        //     fontSize: "16px"
        //   },
        //   colors: {
        //     backgroundColor: "#212121",
        //     primaryTextColor: "#fff",
        //     primaryColor: "#2196F3",
        //     titleColor: "#fff",
        //     alertColor: "#d9534f",
        //     borderColor: "#666"
        //   }
        // }}
      >
        <SearchBox
          componentId="mainSearch"
          dataField={["original_title", "original_title.search"]}
          categoryField="genres.keyword"
          placeholder="Search for movies..."
          iconPosition="left"
          autosuggest={true}
          filterLabel="search"
          enableRecentSuggestions={true}
          enablePopularSuggestions={true}
          enablePredictiveSuggestions={true}
          index="movies-demo-app"
          size={10}
        />
        <DataSearch componentId="dataSearch" dataField={["original_title"]} />
        <MultiDataList
          componentId="language-list"
          dataField="original_language.keyword"
          className="language-filter"
          size={100}
          sortBy="asc"
          queryFormat="or"
          selectAllLabel="All Languages"
          showCheckbox={true}
          showSearch={true}
          placeholder="Search for a language"
          react={{
            and: ["mainSearch"]
          }}
          data={[
            {
              label: "English",
              value: "en"
            },
            {
              label: "Chinese",
              value: "zh"
            },
            {
              label: "Turkish",
              value: "tr"
            },
            {
              label: "Swedish",
              value: "sv"
            },
            {
              label: "Russian",
              value: "ru"
            },
            {
              label: "Portuguese",
              value: "pt"
            },
            {
              label: "Korean",
              value: "ko"
            },
            {
              label: "Japanese",
              value: "ja"
            },
            {
              label: "Italian",
              value: "it"
            },
            {
              label: "Hindi",
              value: "hi"
            },
            {
              label: "French",
              value: "fr"
            },
            {
              label: "Finnish",
              value: "fi"
            },
            {
              label: "Spanish",
              value: "es"
            },
            {
              label: "Deutsch",
              value: "de"
            }
          ]}
          showFilter={true}
          filterLabel="Language"
          URLParams={false}
          innerClass={{
            label: "list-item",
            input: "list-input"
          }}
        />

        <ReactiveList
          style={{ background: "transparent", height: "80vh" }}
          componentId="results"
          dataField={["original_title", "original_title.search"]}
          react={{
            and: ["mainSearch", "language-list", "dataSearch"]
          }}
          // pagination={true}
          // paginationAt="bottom"
          // pages={5}
          // size={12}
          Loader="Loading..."
          noResults="No movies were found..."
        >
          {({ data }) => (
            <ReactiveList.ResultCardsWrapper>
              {data.map((item) => (
                <ResultCard key={item._id}>
                  <ResultCard.Image src={item.poster_path} />
                  <ResultCard.Title
                    dangerouslySetInnerHTML={{
                      __html: item.original_title
                    }}
                  />
                </ResultCard>
              ))}
            </ReactiveList.ResultCardsWrapper>
          )}
        </ReactiveList>
      </ReactiveBase>
    </div>
  );
}

export default App;
