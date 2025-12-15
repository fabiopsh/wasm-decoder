export var ValType;
(function (ValType) {
    ValType[ValType["i32"] = 127] = "i32";
    ValType[ValType["i64"] = 126] = "i64";
    ValType[ValType["f32"] = 125] = "f32";
    ValType[ValType["f64"] = 124] = "f64";
    ValType[ValType["v128"] = 123] = "v128";
    ValType[ValType["funcRef"] = 112] = "funcRef";
    ValType[ValType["externRef"] = 111] = "externRef";
})(ValType || (ValType = {}));
export var SectionId;
(function (SectionId) {
    SectionId[SectionId["Custom"] = 0] = "Custom";
    SectionId[SectionId["Type"] = 1] = "Type";
    SectionId[SectionId["Import"] = 2] = "Import";
    SectionId[SectionId["Function"] = 3] = "Function";
    SectionId[SectionId["Table"] = 4] = "Table";
    SectionId[SectionId["Memory"] = 5] = "Memory";
    SectionId[SectionId["Global"] = 6] = "Global";
    SectionId[SectionId["Export"] = 7] = "Export";
    SectionId[SectionId["Start"] = 8] = "Start";
    SectionId[SectionId["Element"] = 9] = "Element";
    SectionId[SectionId["Code"] = 10] = "Code";
    SectionId[SectionId["Data"] = 11] = "Data";
})(SectionId || (SectionId = {}));
