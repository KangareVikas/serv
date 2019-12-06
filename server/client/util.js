
exports.convertFieldsIntoObject = (fields, fieldsFilterList) => {
    let fieldsAsObject = {};
    for (let field of fields) {
        if (!fieldsFilterList || fieldsFilterList.includes(field.name)) {
            fieldsAsObject[field.name] = field.value;
        }
    }
    return fieldsAsObject;
};

exports.convertFieldsIntoFieldIdObject = (fields, fieldsFilterList) => {
    let fieldsAsObject = {};
    for (let field of fields) {
        if (!fieldsFilterList || fieldsFilterList.includes(field.name)) {
            fieldsAsObject[field.name] = field.fieldId;
        }
    }
    return fieldsAsObject;
};

exports.createUpdateFieldsFromNamesMap = (nameToFieldIdObject, nameToValuesObject) => {
    let fieldNames = Object.keys(nameToValuesObject);
    let arrUpdateFields = [];
    for (let fieldName of fieldNames) {
        let fieldId = nameToFieldIdObject[fieldName];
        if (fieldId) {
            exports.createUpdateFieldEntry(arrUpdateFields, fieldId, nameToValuesObject[fieldName]);
        } else {
            console.warn(`createUpdateFieldsFromNamesMap: Not adding value of ${fieldName} - field id not found.`)
        }
    }
    return arrUpdateFields;
};

exports.createUpdateFields = (fields, nameToValuesObject) => {
    let nameToFieldIdObject = exports.convertFieldsIntoFieldIdObject(fields);
    return exports.createUpdateFieldsFromNamesMap(nameToFieldIdObject, nameToValuesObject);
};

exports.createUpdateFieldArray = (fieldId, valueOrValues) => {
    let arrUpdateFields = [];
    exports.createUpdateFieldEntry(arrUpdateFields, fieldId, fieldIdToValuesObject[fieldId]);
    return arrUpdateFields;
};

exports.createUpdateFieldEntry = (arrUpdateFields, fieldId, valueOrValues) => {
    if (Array.isArray(valueOrValues)) {
        for (let value of valueOrValues) {
            arrUpdateFields.push({
                'dirty': true,
                'fieldId': fieldId,
                'value': value
            });
        }
    } else {
        arrUpdateFields.push({
            'dirty': true,
            'fieldId': fieldId,
            'value': valueOrValues
        });
    }
};

exports.getFieldId = (fields, fieldName) => {
    let fieldsAsObject = {};
    for (let field of fields) {
        if (field.name == fieldName) return field.fieldId;
    }
    return null;
};

exports.createSelectFromFieldValues = (values, defaultValue) => {
    values = [...new Set(values)];
    let options = [];
    values.map(item => { options.push({ "label": item, "value": item }) });
    return { "options": options, "selected": defaultValue || "" };
};
