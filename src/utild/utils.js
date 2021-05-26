export const formatResponse = (data) => {

    const result = {};

    data.forEach(({Field, Type}) => {

        if (Type.includes("enum")) {
            let fields = Type.replace("enum(", "").replace(")", "").replaceAll("'","");
            result[Field] = { options:  fields.split(",") , value : ""};
        } else if (Type.includes("var")) {
            result[Field] = "";
        } else if (Type.includes("int") && Field !== "id") {
            result[Field] = 0;
        }

    })

    return result;
}