exports.convertFieldsIntoObjectUsingBoDef = (boDef, fields, fieldsFilterList) => {
    let fieldsAsObject = {};
    for (let field of fields) {
        let fieldName = boDef.fields.ids[exports.parseFieldId(field.fieldId, 'FI')];
        if (!fieldsFilterList || fieldsFilterList.includes(fieldName)) {
            fieldsAsObject[fieldName] = field.value;
        }
    }
    return fieldsAsObject;
};


exports.createUpdateFieldsFromBoDef = (boDef, nameToValuesObject) => {
    let fieldNames = Object.keys(nameToValuesObject);
    let arrUpdateFields = [];
    for (let fieldName of fieldNames) {
        let fieldId = boDef.fields.names[fieldName];
        if (fieldId) {
            exports.createUpdateFieldEntry(arrUpdateFields, fieldId, nameToValuesObject[fieldName]);
        } else {
            console.warn(`createUpdateFieldsFromBoDef: Not adding value of ${fieldName} - field id not found.`)
        }
    }
    return arrUpdateFields;
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

exports.createSelectFromFieldValues = (values, defaultValue) => {
    values = [...new Set(values)];
    let options = [];
    values.map(item => { options.push({ "label": item, "value": item }) });
    return { "options": options, "selected": defaultValue || "" };
};

// requirePart is 'BO', 'FI' or 'RE'
exports.parseFieldId = (fieldId, requiredPart) => {
    let arrFieldParts = fieldId.split(',');
    if(arrFieldParts.length == 1) { // We don't have a comma in the field id.
        return arrFieldParts[0];
    } else {
        for(let fieldPart of arrFieldParts) {
            if(fieldPart.startsWith(requiredPart+':')) {
                return fieldPart.substring(3);
            }
        }    
    }
    return null;
};