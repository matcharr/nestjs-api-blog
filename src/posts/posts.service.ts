import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/post.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class PostsService {
  private _postsRespository: Repository<PostsEntity>;

  constructor(private _connection: Connection) {
    this._postsRespository = this._connection.getRepository(PostsEntity);
  }

  async create(createPostDto: CreatePostDto) {
    const newPost = this._postsRespository.create();

    newPost.title = createPostDto.title;
    newPost.content = createPostDto.content;
    await this._postsRespository.save(newPost);
    return newPost;
  }

  async findAll() {
    return await this._postsRespository.find();
  }

  async findOne(id: number) {
    return await this._postsRespository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this._postsRespository.findOneOrFail(id);

    post.content = updatePostDto.content;
    post.title = updatePostDto.title;

    await this._postsRespository.save(post);
    return post;
  }

  async remove(id: number) {
    await this._postsRespository.delete(id);
  }
}
