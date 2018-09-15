// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
getCircleById: ICircle | null;
getCirclesByFilters: ICircle | null;
getCirclesByIds: Array<ICircle> | null;
getUserPublicById: IUserPublic | null;
viewer: IUser | null;
}

interface IGetCircleByIdOnQueryArguments {
id: string;
}

interface IGetCirclesByFiltersOnQueryArguments {
filters?: any | null;
orderBy: string;
cursor?: any | null;
numberOfResults?: number | null;
}

interface IGetCirclesByIdsOnQueryArguments {
ids: Array<string>;
}

interface IGetUserPublicByIdOnQueryArguments {
id: string;
}

interface ICircle {
__typename: "Circle";
id: string | null;
collection: string | null;
pii: boolean | null;

/**
 * parent: Circle
 */
slug: string | null;
public: boolean | null;
passwordRequired: boolean | null;
type: string | null;
settings: any | null;

/**
 * styles: Circle
* rating: Circle
 */
tags: Array<string> | null;
title: string | null;
subtitle: string | null;
description: string | null;

/**
 * media: Circle
 */
icon: string | null;

/**
 * creator: UserPublic
* viewers: [UserPublic]
* editors: [UserPublic]
 */
dateCreated: any | null;
dateUpdated: any | null;
string: string | null;
object: any | null;
number: number | null;
bigNumber: any | null;
boolean: boolean | null;
date: any | null;
geoPoint: any | null;
lines: Array<ICircle> | null;
}

interface IUserPublic {
__typename: "UserPublic";
id: string;
collection: string | null;
username: string | null;
profileMedia: ICircle | null;
dateCreated: any | null;
dateUpdated: any | null;
level: ICircle | null;
rating: ICircle | null;
ui: ICircle | null;
homePublic: ICircle | null;
following: ICircle | null;
history: ICircle | null;
}

interface IUser {
__typename: "User";
id: string;
collection: string | null;
username: string | null;
profileMedia: ICircle | null;
email: string | null;
canCreate: boolean | null;
dateCreated: any | null;
dateUpdated: any | null;
level: ICircle | null;
balance: ICircle | null;
rating: ICircle | null;
uiEnabled: boolean | null;
ui: ICircle | null;
homePublic: ICircle | null;
homePrivate: ICircle | null;
following: ICircle | null;
inbox: ICircle | null;
search: ICircle | null;
}

interface IMutation {
__typename: "Mutation";
createCircleWithId: ICreateCircleResponse | null;
createUser: ICreateUserResponse | null;
}

interface ICreateCircleWithIdOnMutationArguments {
id: string;
}

interface ICreateUserOnMutationArguments {
id: string;
email: string;
}

interface ICreateCircleResponse {
__typename: "CreateCircleResponse";
status: string | null;
createdCircle: ICircle | null;
}

interface ICreateUserResponse {
__typename: "CreateUserResponse";
status: string | null;
createdUser: IUser | null;
}
}

// tslint:enable
