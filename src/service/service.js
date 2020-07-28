import { firebaseDatabase, firebaseStorage } from './base';


export default class Service {
    static findAll(node, callback) {
        let query = firebaseDatabase.ref(node);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(chieldSnapshot => {
                let item = chieldSnapshot.val();
                item['key'] = chieldSnapshot.key;
                items.push(item);

            });
            callback(items);
        });
        return query;
    };

    static uploadFile = (node, imagem, callback) => {
        firebaseStorage.ref(node).child(imagem.name).getDownloadURL().then(url => {
            console.log(url);
        });

    }

    static create = (node, objToSubmit) => {

        const ref = firebaseDatabase.ref(node).push();
        objToSubmit.id = ref.key;
        // { console.log(ref) }


        ref.set(objToSubmit);
        return objToSubmit.id;


    };

    static delete = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

    static getById = (node, id, callback) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        let newData = {};
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
                callback(null);
                return;

            }

            const snap = dataSnapshot.val();
            const keys = Object.keys(snap);

            keys.forEach((key) => {
                newData[key] = snap[key]

            });


        }).then(() => {
            callback(newData);
        });

    };

    static update = (id, node, obj) => {

        return firebaseDatabase.ref(node + '/' + id).set({ ...obj });

    };


}