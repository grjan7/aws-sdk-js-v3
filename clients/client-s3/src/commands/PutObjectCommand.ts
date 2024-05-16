// smithy-typescript generated code
import { getFlexibleChecksumsPlugin } from "@aws-sdk/middleware-flexible-checksums";
import { getCheckContentLengthHeaderPlugin } from "@aws-sdk/middleware-sdk-s3";
import { getSsecPlugin } from "@aws-sdk/middleware-ssec";
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer, StreamingBlobPayloadInputTypes } from "@smithy/types";

import { commonParams } from "../endpoint/EndpointParameters";
import {
  PutObjectOutput,
  PutObjectOutputFilterSensitiveLog,
  PutObjectRequest,
  PutObjectRequestFilterSensitiveLog,
} from "../models/models_1";
import { de_PutObjectCommand, se_PutObjectCommand } from "../protocols/Aws_restXml";
import { S3ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../S3Client";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link PutObjectCommand}.
 */
export interface PutObjectCommandInput extends Omit<PutObjectRequest, "Body"> {
  Body?: StreamingBlobPayloadInputTypes;
}

/**
 * @public
 *
 * The output of {@link PutObjectCommand}.
 */
export interface PutObjectCommandOutput extends PutObjectOutput, __MetadataBearer {}

/**
 * <p>Adds an object to a bucket.</p>
 *          <note>
 *             <ul>
 *                <li>
 *                   <p>Amazon S3 never adds partial objects; if you receive a success response, Amazon S3 added the
 *                entire object to the bucket. You cannot use <code>PutObject</code> to only update a
 *                single piece of metadata for an existing object. You must put the entire object with
 *                updated metadata if you want to update some values.</p>
 *                </li>
 *                <li>
 *                   <p>If your bucket uses the bucket owner enforced setting for Object Ownership, ACLs are disabled and no longer affect permissions. All
 *                   objects written to the bucket by any account will be owned by the bucket owner.</p>
 *                </li>
 *                <li>
 *                   <p>
 *                      <b>Directory buckets</b> - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format <code>https://<i>bucket_name</i>.s3express-<i>az_id</i>.<i>region</i>.amazonaws.com/<i>key-name</i>
 *                      </code>. Path-style requests are not supported. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-express-Regions-and-Zones.html">Regional and Zonal endpoints</a> in the
 *     <i>Amazon S3 User Guide</i>.</p>
 *                </li>
 *             </ul>
 *          </note>
 *          <p>Amazon S3 is a distributed system. If it receives multiple write requests for the same object
 *          simultaneously, it overwrites all but the last object written. However, Amazon S3 provides features that can modify this behavior:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <b>S3 Object Lock</b> - To prevent objects from
 *             being deleted or overwritten, you can use <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html">Amazon S3 Object
 *                Lock</a> in the <i>Amazon S3 User Guide</i>.</p>
 *                <note>
 *                   <p>This functionality is not supported for directory buckets.</p>
 *                </note>
 *             </li>
 *             <li>
 *                <p>
 *                   <b>S3 Versioning</b> - When you enable
 *             versioning for a bucket, if Amazon S3 receives multiple write requests for the same object
 *             simultaneously, it stores all versions of the objects. For each write request that is made to the same object, Amazon S3 automatically generates a unique version ID
 *             of that object being stored in Amazon S3.
 *            You can retrieve, replace, or delete any version of the object. For more information about versioning, see
 *             <a href="https://docs.aws.amazon.com/AmazonS3/latest/dev/AddingObjectstoVersioningEnabledBuckets.html">Adding Objects to
 *                Versioning-Enabled Buckets</a> in the <i>Amazon S3
 *                   User Guide</i>. For information about returning the versioning state
 *             of a bucket, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketVersioning.html">GetBucketVersioning</a>. </p>
 *                <note>
 *                   <p>This functionality is not supported for directory buckets.</p>
 *                </note>
 *             </li>
 *          </ul>
 *          <dl>
 *             <dt>Permissions</dt>
 *             <dd>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <b>General purpose bucket permissions</b> - The following permissions are required in your policies when your
 *                         <code>PutObject</code> request includes specific headers.</p>
 *                      <ul>
 *                         <li>
 *                            <p>
 *                               <b>
 *                                  <code>s3:PutObject</code>
 *                               </b> - To successfully complete the <code>PutObject</code> request, you must always have the <code>s3:PutObject</code> permission on a bucket to add an object
 *                                  to it.</p>
 *                         </li>
 *                         <li>
 *                            <p>
 *                               <b>
 *                                  <code>s3:PutObjectAcl</code>
 *                               </b> - To successfully change the objects ACL of your <code>PutObject</code> request, you must have the <code>s3:PutObjectAcl</code>.</p>
 *                         </li>
 *                         <li>
 *                            <p>
 *                               <b>
 *                                  <code>s3:PutObjectTagging</code>
 *                               </b> - To successfully set the tag-set with your <code>PutObject</code> request, you
 *                                  must have the <code>s3:PutObjectTagging</code>.</p>
 *                         </li>
 *                      </ul>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <b>Directory bucket permissions</b> - To grant access to this API operation on a directory bucket, we recommend that you use the <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateSession.html">
 *                            <code>CreateSession</code>
 *                         </a> API operation for session-based authorization. Specifically, you grant the <code>s3express:CreateSession</code> permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the <code>CreateSession</code> API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another <code>CreateSession</code> API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateSession.html">
 *                            <code>CreateSession</code>
 *                         </a>.</p>
 *                   </li>
 *                </ul>
 *             </dd>
 *             <dt>Data integrity with Content-MD5</dt>
 *             <dd>
 *                <ul>
 *                   <li>
 *                      <p>
 *                         <b>General purpose bucket</b> - To ensure that data is not corrupted traversing the network, use the
 *                     <code>Content-MD5</code> header. When you use this header, Amazon S3 checks the object
 *                     against the provided MD5 value and, if they do not match, Amazon S3 returns an error. Alternatively, when the object's ETag is its MD5 digest,
 *                     you can calculate the MD5 while putting the object to Amazon S3 and compare the returned ETag to
 *                     the calculated MD5 value.</p>
 *                   </li>
 *                   <li>
 *                      <p>
 *                         <b>Directory bucket</b> - This functionality is not supported for directory buckets.</p>
 *                   </li>
 *                </ul>
 *             </dd>
 *             <dt>HTTP Host header syntax</dt>
 *             <dd>
 *                <p>
 *                   <b>Directory buckets </b> - The HTTP Host header syntax is <code>
 *                      <i>Bucket_name</i>.s3express-<i>az_id</i>.<i>region</i>.amazonaws.com</code>.</p>
 *             </dd>
 *          </dl>
 *          <p>For more information about related Amazon S3 APIs, see the following:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html">CopyObject</a>
 *                </p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html">DeleteObject</a>
 *                </p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
 * // const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
 * const client = new S3Client(config);
 * const input = { // PutObjectRequest
 *   ACL: "private" || "public-read" || "public-read-write" || "authenticated-read" || "aws-exec-read" || "bucket-owner-read" || "bucket-owner-full-control",
 *   Body: "MULTIPLE_TYPES_ACCEPTED", // see \@smithy/types -> StreamingBlobPayloadInputTypes
 *   Bucket: "STRING_VALUE", // required
 *   CacheControl: "STRING_VALUE",
 *   ContentDisposition: "STRING_VALUE",
 *   ContentEncoding: "STRING_VALUE",
 *   ContentLanguage: "STRING_VALUE",
 *   ContentLength: Number("long"),
 *   ContentMD5: "STRING_VALUE",
 *   ContentType: "STRING_VALUE",
 *   ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256",
 *   ChecksumCRC32: "STRING_VALUE",
 *   ChecksumCRC32C: "STRING_VALUE",
 *   ChecksumSHA1: "STRING_VALUE",
 *   ChecksumSHA256: "STRING_VALUE",
 *   Expires: new Date("TIMESTAMP"),
 *   GrantFullControl: "STRING_VALUE",
 *   GrantRead: "STRING_VALUE",
 *   GrantReadACP: "STRING_VALUE",
 *   GrantWriteACP: "STRING_VALUE",
 *   Key: "STRING_VALUE", // required
 *   Metadata: { // Metadata
 *     "<keys>": "STRING_VALUE",
 *   },
 *   ServerSideEncryption: "AES256" || "aws:kms" || "aws:kms:dsse",
 *   StorageClass: "STANDARD" || "REDUCED_REDUNDANCY" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "GLACIER" || "DEEP_ARCHIVE" || "OUTPOSTS" || "GLACIER_IR" || "SNOW" || "EXPRESS_ONEZONE",
 *   WebsiteRedirectLocation: "STRING_VALUE",
 *   SSECustomerAlgorithm: "STRING_VALUE",
 *   SSECustomerKey: "STRING_VALUE",
 *   SSECustomerKeyMD5: "STRING_VALUE",
 *   SSEKMSKeyId: "STRING_VALUE",
 *   SSEKMSEncryptionContext: "STRING_VALUE",
 *   BucketKeyEnabled: true || false,
 *   RequestPayer: "requester",
 *   Tagging: "STRING_VALUE",
 *   ObjectLockMode: "GOVERNANCE" || "COMPLIANCE",
 *   ObjectLockRetainUntilDate: new Date("TIMESTAMP"),
 *   ObjectLockLegalHoldStatus: "ON" || "OFF",
 *   ExpectedBucketOwner: "STRING_VALUE",
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * // { // PutObjectOutput
 * //   Expiration: "STRING_VALUE",
 * //   ETag: "STRING_VALUE",
 * //   ChecksumCRC32: "STRING_VALUE",
 * //   ChecksumCRC32C: "STRING_VALUE",
 * //   ChecksumSHA1: "STRING_VALUE",
 * //   ChecksumSHA256: "STRING_VALUE",
 * //   ServerSideEncryption: "AES256" || "aws:kms" || "aws:kms:dsse",
 * //   VersionId: "STRING_VALUE",
 * //   SSECustomerAlgorithm: "STRING_VALUE",
 * //   SSECustomerKeyMD5: "STRING_VALUE",
 * //   SSEKMSKeyId: "STRING_VALUE",
 * //   SSEKMSEncryptionContext: "STRING_VALUE",
 * //   BucketKeyEnabled: true || false,
 * //   RequestCharged: "requester",
 * // };
 *
 * ```
 *
 * @param PutObjectCommandInput - {@link PutObjectCommandInput}
 * @returns {@link PutObjectCommandOutput}
 * @see {@link PutObjectCommandInput} for command's `input` shape.
 * @see {@link PutObjectCommandOutput} for command's `response` shape.
 * @see {@link S3ClientResolvedConfig | config} for S3Client's `config` shape.
 *
 * @throws {@link S3ServiceException}
 * <p>Base exception class for all service exceptions from S3 service.</p>
 *
 * @public
 * @example To upload an object
 * ```javascript
 * // The following example uploads an object to a versioning-enabled bucket. The source file is specified using Windows file syntax. S3 returns VersionId of the newly created object.
 * const input = {
 *   "Body": "HappyFace.jpg",
 *   "Bucket": "examplebucket",
 *   "Key": "HappyFace.jpg"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "VersionId": "tpf3zF08nBplQK1XLOefGskR7mGDwcDk"
 * }
 * *\/
 * // example id: to-upload-an-object-1481760101010
 * ```
 *
 * @example To upload an object (specify optional headers)
 * ```javascript
 * // The following example uploads an object. The request specifies optional request headers to directs S3 to use specific storage class and use server-side encryption.
 * const input = {
 *   "Body": "HappyFace.jpg",
 *   "Bucket": "examplebucket",
 *   "Key": "HappyFace.jpg",
 *   "ServerSideEncryption": "AES256",
 *   "StorageClass": "STANDARD_IA"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "ServerSideEncryption": "AES256",
 *   "VersionId": "CG612hodqujkf8FaaNfp8U..FIhLROcp"
 * }
 * *\/
 * // example id: to-upload-an-object-(specify-optional-headers)
 * ```
 *
 * @example To upload object and specify user-defined metadata
 * ```javascript
 * // The following example creates an object. The request also specifies optional metadata. If the bucket is versioning enabled, S3 returns version ID in response.
 * const input = {
 *   "Body": "filetoupload",
 *   "Bucket": "examplebucket",
 *   "Key": "exampleobject",
 *   "Metadata": {
 *     "metadata1": "value1",
 *     "metadata2": "value2"
 *   }
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "VersionId": "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
 * }
 * *\/
 * // example id: to-upload-object-and-specify-user-defined-metadata-1483396974757
 * ```
 *
 * @example To upload an object and specify canned ACL.
 * ```javascript
 * // The following example uploads and object. The request specifies optional canned ACL (access control list) to all READ access to authenticated users. If the bucket is versioning enabled, S3 returns version ID in response.
 * const input = {
 *   "ACL": "authenticated-read",
 *   "Body": "filetoupload",
 *   "Bucket": "examplebucket",
 *   "Key": "exampleobject"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "VersionId": "Kirh.unyZwjQ69YxcQLA8z4F5j3kJJKr"
 * }
 * *\/
 * // example id: to-upload-an-object-and-specify-canned-acl-1483397779571
 * ```
 *
 * @example To create an object.
 * ```javascript
 * // The following example creates an object. If the bucket is versioning enabled, S3 returns version ID in response.
 * const input = {
 *   "Body": "filetoupload",
 *   "Bucket": "examplebucket",
 *   "Key": "objectkey"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "VersionId": "Bvq0EDKxOcXLJXNo_Lkz37eM3R4pfzyQ"
 * }
 * *\/
 * // example id: to-create-an-object-1483147613675
 * ```
 *
 * @example To upload an object and specify server-side encryption and object tags
 * ```javascript
 * // The following example uploads an object. The request specifies the optional server-side encryption option. The request also specifies optional object tags. If the bucket is versioning enabled, S3 returns version ID in response.
 * const input = {
 *   "Body": "filetoupload",
 *   "Bucket": "examplebucket",
 *   "Key": "exampleobject",
 *   "ServerSideEncryption": "AES256",
 *   "Tagging": "key1=value1&key2=value2"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "ServerSideEncryption": "AES256",
 *   "VersionId": "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
 * }
 * *\/
 * // example id: to-upload-an-object-and-specify-server-side-encryption-and-object-tags-1483398331831
 * ```
 *
 * @example To upload an object and specify optional tags
 * ```javascript
 * // The following example uploads an object. The request specifies optional object tags. The bucket is versioned, therefore S3 returns version ID of the newly created object.
 * const input = {
 *   "Body": "c:\\HappyFace.jpg",
 *   "Bucket": "examplebucket",
 *   "Key": "HappyFace.jpg",
 *   "Tagging": "key1=value1&key2=value2"
 * };
 * const command = new PutObjectCommand(input);
 * const response = await client.send(command);
 * /* response ==
 * {
 *   "ETag": "\"6805f2cfc46c0f04559748bb039d69ae\"",
 *   "VersionId": "psM2sYY4.o1501dSx8wMvnkOzSBB.V4a"
 * }
 * *\/
 * // example id: to-upload-an-object-and-specify-optional-tags-1481762310955
 * ```
 *
 */
export class PutObjectCommand extends $Command
  .classBuilder<
    PutObjectCommandInput,
    PutObjectCommandOutput,
    S3ClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
    Bucket: { type: "contextParams", name: "Bucket" },
    Key: { type: "contextParams", name: "Key" },
  })
  .m(function (this: any, Command: any, cs: any, config: S3ClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
      getCheckContentLengthHeaderPlugin(config),
      getSsecPlugin(config),
      getFlexibleChecksumsPlugin(config, {
        input: this.input,
        requestAlgorithmMember: "ChecksumAlgorithm",
        requestChecksumRequired: false,
      }),
    ];
  })
  .s("AmazonS3", "PutObject", {})
  .n("S3Client", "PutObjectCommand")
  .f(PutObjectRequestFilterSensitiveLog, PutObjectOutputFilterSensitiveLog)
  .ser(se_PutObjectCommand)
  .de(de_PutObjectCommand)
  .build() {}
