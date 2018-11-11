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
getProfileByUsername: IGetProfileByUsernameResponse | null;
getUsersProfileById: IProfile | null;
user: IUser | null;
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

interface IGetProfileByUsernameOnQueryArguments {
username: string;
}

interface IGetUsersProfileByIdOnQueryArguments {
id: string;
}

interface ICircle {
__typename: "Circle";
id: string | null;
collection: string | null;
pii: boolean | null;
parent: ICircle | null;
slug: string | null;
public: boolean | null;
passwordRequired: boolean | null;
type: string | null;
settings: any | null;
styles: ICircle | null;
rating: ICircle | null;
tags: Array<string> | null;
title: string | null;
subtitle: string | null;
description: string | null;
media: ICircle | null;
icon: string | null;
creator: IProfile | null;
owner: IProfile | null;
viewers: Array<IProfile> | null;
editors: Array<IProfile> | null;
dateCreated: any | null;
dateUpdated: any | null;
string: string | null;
data: any | null;
number: number | null;
bigNumber: any | null;
boolean: boolean | null;
date: any | null;
geoPoint: any | null;
lines: Array<ICircle> | null;
}

interface IProfile {
__typename: "Profile";
id: string;
collection: string | null;
public: boolean | null;
username: string | null;
canCreate: boolean | null;
profileMedia: ICircle | null;
dateCreated: any | null;
dateUpdated: any | null;
level: ICircle | null;
rating: ICircle | null;
isDarkTheme: boolean | null;
isMyTypeStyles: boolean | null;
myTypeStyles: ICircle | null;
isMyTheme: boolean | null;
myTheme: ICircle | null;
homePublic: ICircle | null;
home: ICircle | null;
following: ICircle | null;
history: ICircle | null;
}

interface IGetProfileByUsernameResponse {
__typename: "getProfileByUsernameResponse";
usernameAvailable: boolean | null;
usernameInvalid: boolean | null;
}

interface IUser {
__typename: "User";
id: string;
collection: string | null;
email: string | null;
history: ICircle | null;
canCreate: boolean | null;
dateCreated: any | null;
dateUpdated: any | null;
levelTotal: ICircle | null;
balanceTotal: ICircle | null;
ratingTotal: ICircle | null;
allMyThemes: ICircle | null;
allMyTypeStyles: ICircle | null;
inbox: ICircle | null;
search: ICircle | null;
selectedProfile: IProfile | null;
profiles: Array<IProfile> | null;
}

interface IMutation {
__typename: "Mutation";
createCircle: ICreateCircleResponse | null;
createProfile: ICreateProfileResponse | null;
updateProfile: IUpdateProfileResponse | null;
createUser: ICreateUserResponse | null;
}

interface ICreateCircleOnMutationArguments {
id?: string | null;
collection: string;
pii?: boolean | null;
parent?: string | null;
slug?: string | null;
public?: boolean | null;
passwordRequired?: boolean | null;
type: string;
settings?: any | null;
styles?: string | null;
rating?: string | null;
tags?: Array<string> | null;
title?: string | null;
subtitle?: string | null;
description?: string | null;
media?: string | null;
icon?: string | null;
creator: string;
owner?: string | null;
viewers?: Array<string> | null;
editors?: Array<string> | null;
dateCreated?: any | null;
dateUpdated?: any | null;
string?: string | null;
data?: any | null;
number?: number | null;
bigNumber?: any | null;
boolean?: boolean | null;
date?: any | null;
geoPoint?: any | null;
lines?: Array<string> | null;
}

interface ICreateProfileOnMutationArguments {
username: string;
}

interface IUpdateProfileOnMutationArguments {
id: string;
data?: any | null;
}

interface ICreateUserOnMutationArguments {
id: string;
email: string;
}

interface ICreateCircleResponse {
__typename: "CreateCircleResponse";
status: string | null;
message: string | null;
createdCircle: ICircle | null;
creator: IProfile | null;
}

interface ICreateProfileResponse {
__typename: "CreateProfileResponse";
status: string | null;
message: string | null;
createdProfile: IProfile | null;
}

interface IUpdateProfileResponse {
__typename: "UpdateProfileResponse";
status: string | null;
message: string | null;
updatedProfile: IProfile | null;
}

interface ICreateUserResponse {
__typename: "CreateUserResponse";
status: string | null;
createdUser: IUser | null;
}
}

// tslint:enable
