import { Injectable, Logger } from '@nestjs/common';
import { Express } from "express";
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
} from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name);
    private region: string;
    private s3: S3Client;

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>("S3_REGION")
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY")
            }
        })
        
    }

    async uploadImageFile(file: Express.Multer.File, key: string) {
        const bucket = this.configService.get<string>("S3_BUCKET");

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: "public-read"
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            )
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }  
            throw new Error("Image not saved to s3!")
        } catch (error) {
            this.logger.error("Cannot save image file inside S3", error)
            throw error
        }
    } 

    async uploadVideoFile(file: Express.Multer.File, key: string) {
        const bucket = this.configService.get<string>("S3_BUCKET");
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: "public-read"
        }
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            )
            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }  
            throw new Error("Video not saved to s3!")
        } catch (error) {
            this.logger.error("Cannot save video file inside S3", error)
            throw error
        }
    } 
    
}
