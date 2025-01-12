import Model, { attr, belongsTo, hasMany } from "@ember-data/model";
import Store, { normalizeModelName, recordIdentifierFor, Snapshot } from "@ember-data/store";
import EmberArray from "@ember/array";
import DS from "ember-data";
import ModelRegistry from "ember-data/types/registries/model";

// -- support types
declare class Post extends Model {
    @attr("string")
    title: string;

    @hasMany("post-comment")
    comments: EmberArray<PostComment>;
}

declare class PostComment extends Model {
    @belongsTo("post")
    post: Post;
}

declare module "ember-data/types/registries/model" {
    export default interface ModelRegistry {
        post: Post;
        "post-comment": PostComment;
    }
}

// -- actual tests
Store; // $ExpectType<DS.Store>
Snapshot; // $ExpectType<DS.Snapshot>
normalizeModelName("post"); // $ExpectType<string>
normalizeModelName("post-comment"); // $ExpectType<string>
// recordIdentifierFor(Store.createRecord("post", { title: "title" })); // $ExpectType<RecordIdentifier<"post">>
