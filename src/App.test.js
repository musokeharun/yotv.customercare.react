import { render, screen } from '@testing-library/react';
import App from './App';
import Radio from "./components/common/Radio";
import Select from "./components/common/select";
import Input from "./components/common/input";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

{/*RESPONSES*/}
<div className={"row my-md-2 my-1 justify-content-center"}>

  {!!ownPropertyNames.length &&
  ownPropertyNames.map((property, index) => {
    if (typeof responses[property] === "object" && responses[property].options && responses[property].options.length <= 4) {
      return (
          <div className={"col-md-auto col-12 mb-3"} key={"input1" + index}>
            <div className={"card"}>
              <div className={"card-body"}>
                <h6>{property.toUpperCase()}</h6>
                <div className={"flex-row mt-md-3 mt-1"}>
                  {
                    responses[property].options.map((option, i) =>
                        (
                            <Radio value={option}
                                   name={property}
                                   key={"input2" + i}
                                   currentValue={responses[property].value}
                                   handleChange={(name, value) => this.handleChange(name, value)}
                            />
                        )
                    )
                  }
                </div>
              </div>

            </div>

          </div>
      );
    } else if (typeof responses[property] === "object" && responses[property].options && responses[property].options.length > 4) {
      return (
          <div className={"col-md-auto col-12 mb-3"} key={"input3" + index}>
            <div className={"card"}>
              <div className={"card-body"}>
                <h6>{property.toUpperCase()}</h6>
                <Select
                    handleChange={({currentTarget}) => this.handleChange(currentTarget.name, currentTarget.value)}
                    name={property} label={property}
                    currentValue={responses[property].value}
                    options={responses[property].options}/>
              </div>
            </div>
          </div>
      );
    } else if (typeof responses[property] === "string") {
      return (
          <div className={"col-md-auto col-12 mb-3"} key={"input4" + index}>
            <div className={"card"}>
              <div className={"card-body"}>
                <h6>{property.toUpperCase()}</h6>
                <Input name={property} value={responses[property]}
                       onChange={(e) => this.handleChange(property, e.target.value)}
                       placeholder={""} type={"text"}
                />
              </div>
            </div>
          </div>
      )
    } else if (typeof responses[property] === "number") {
      return (
          <div className={"col-md-auto col-12 mb-3"} key={"input5" + index}>
            <div className={"card"}>
              <div className={"card-body"}>
                <h6>{property.toUpperCase() + "HOOD TO PAY"}</h6>
                <Input name={property} value={responses[property]}
                       onChange={(e) => this.handleChange(property, Number(e.target.value))}
                       placeholder={""} className={"form-range"}
                       type={"range"}
                       step={1} max={5}
                />
              </div>
            </div>
          </div>
      )
    }
    return <Fragment/>
  })}

</div>