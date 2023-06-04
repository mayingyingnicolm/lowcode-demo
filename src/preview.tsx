import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const packages = JSON.parse(window.localStorage.getItem('packages') || '');

    const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');
    window.projectSchema=projectSchema;
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];
    const children=schema.children;
    for(let i=0;i<children.length;i++){
      if(children[i].componentName=="ProForm"){
        const items=children[i].children
        console.log(items[items.length-1].hidden)
        // if(items[items.length-1].hidden===false){
          if(items[items.length-1].props.formItemProps.name!="json"){
          console.log("11111")
          children[i].children.push({
          "componentName": "FormInput",
          "id": "node_ocl2fqk2dve",
          "props": {
              "formItemProps": {
                  "primaryKey": "3310",
                  "label": "",
                  "size": "medium",
                  "device": "desktop",
                  "name": "json",
                  "fullWidth": true
              },
              "placeholder": "请输入",
              "value":children[i].props.json
             
          },
          "hidden": true,
         
          "title": "",
          "isLocked": false,
          "condition": true,
          "conditionGroup": ""
      })
        }
        
      }
    }
    
    schema.children=children;
    console.log(schema)
    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
