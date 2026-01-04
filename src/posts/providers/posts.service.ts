import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { response } from 'express';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PostsService {
  /**
   * Injecting user service, post and metaOption repository
   */
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * creating new posts
   */

  public async create(@Body() createPostDto: CreatePostDto) {
    // Find author from database based on  authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);
    // const { metaOptions, ...postData } = createPostDto;

    // // Create metaOptions
    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }
    // CreatePost
    // let post = this.postsRepository.create({
    //   ...postData,
    //   metaOptions: metaOptions ?? undefined,
    // });

    if (!author) throw new NotFoundException('Author not found');

    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });

    // Return the post to user
    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    //Users service
    //Find a user
    //return posts

    let posts = await this.postsRepository.find({
      // We can load metaOptions by uncommenting the code below or using eager loading in post entity
      // relations: {
      //   metaOptions: true,
      // },
    });

    return posts;
  }

  public async delete(id: number) {
    // Find the post
    // let post = await this.postsRepository.findOneBy({ id });
    // // Delete the post
    const result = await this.postsRepository.delete(id);

    // // Delete metaOptions
    // if (post?.metaOptions?.id) {
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }
    // let inversePost = await this.metaOptionsRepository.find({
    //   where: { id: post?.metaOptions?.id },
    //   relations: {
    //     post: true,
    //   },
    // });
    // Confirmation
    return {
      Deleted: result.affected === 0 ? false : true,
      response: result.raw[0],
      id,
    };
    // return { inversePost };
  }
}
