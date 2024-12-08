"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.User = void 0;
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.User = {
    email: values_1.v.string(),
    clerkId: values_1.v.string(),
    imageUrl: values_1.v.optional(values_1.v.string()),
    first_name: values_1.v.optional(values_1.v.string()),
    last_name: values_1.v.optional(values_1.v.string()),
    username: values_1.v.union(values_1.v.string(), values_1.v.null()),
    bio: values_1.v.optional(values_1.v.string()),
    location: values_1.v.optional(values_1.v.string()),
    websiteUrl: values_1.v.optional(values_1.v.string()),
    followersCount: values_1.v.number(),
    pushToken: values_1.v.optional(values_1.v.string()),
};
exports.Message = {
    userId: values_1.v.id('users'), // Foreign key to users table
    threadId: values_1.v.optional(values_1.v.string()),
    content: values_1.v.string(),
    likeCount: values_1.v.number(), // Default value 0
    commentCount: values_1.v.number(), // Default value 0
    retweetCount: values_1.v.number(), // Default value 0
    mediaFiles: values_1.v.optional(values_1.v.array(values_1.v.string())), // Array of media file URLs
    websiteUrl: values_1.v.optional(values_1.v.string()), // Optional website URL
};
exports.default = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)(exports.User).index('byClerkId', ['clerkId']).searchIndex('searchUsers', {
        searchField: 'username',
    }),
    messages: (0, server_1.defineTable)(exports.Message),
});
